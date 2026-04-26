import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { useState } from "react";

const SkeletonStructure = () => {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton style={{ backgroundColor: "gray" }} />
      <Skeleton style={{ backgroundColor: "gray" }} />
      <Skeleton style={{ backgroundColor: "gray" }} />
      <Skeleton style={{ backgroundColor: "gray" }} />
      <Skeleton style={{ backgroundColor: "gray" }} />
      <Skeleton style={{ backgroundColor: "gray" }} />
    </Box>
  );
};

const baseURL = "http://localhost:8000";

const fetchFeatures = async () => {
  const response = await fetch(`${baseURL}/features`);
  if (!response.ok) throw new Error("some thing went wrong");

  return response.json();
};

const Form = ({ handler }) => {
  const [feature, setFeature] = useState("");
  const [creator, setCreator] = useState("");

  const submitHandler = (event: any) => {
    event.preventDefault();
    const newFeature = {
      name: feature,
      creator,
      id: Date.now(),
      likes: 0,
    };

    handler.mutate(newFeature);

    setFeature("");
    setCreator("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="feature"></label>
        <input
          type="text"
          id="feature"
          name="feature"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          placeholder="Enter feature name"
        />
      </div>
      <div>
        <label htmlFor="creator"></label>
        <input
          type="text"
          id="creator"
          name="creator"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          placeholder="Enter creator name"
        />
      </div>
      <button type="submit" disabled={handler.isPending}>
        Add Feature
      </button>
    </form>
  );
};

export type FeatureProps = {
  name: string;
  creator: string;
  id: string;
  likes: number;
};

const sendLike = async (id: string) => {
  const response = await fetch(`${baseURL}/upvote/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) throw new Error("Error in like");

  return response.json();
};

const mutateDelete = async (id: string) => {
  const response = await fetch(`${baseURL}/remove/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error in like");

  return response.json();
};

const Features = ({
  features,
  addMutation,
}: {
  features: FeatureProps[];
  addMutation: UseMutationResult<any, Error, FeatureProps, unknown>;
}) => {
  const queryClient = useQueryClient();
  let mutatingFeature = addMutation.variables;

  const likeMutation = useMutation({
    mutationFn: sendLike,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["features"] });

      const previous = queryClient.getQueryData(["features"]);

      queryClient.setQueryData(["features"], (old) =>
        old.map((f) => (f.id === id ? { ...f, likes: f.likes + 1 } : f)),
      );

      return { previous };
    },
    onError: (_err, _variables, context) => {
      console.log({ context });
      queryClient.setQueryData(["features"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: mutateDelete,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["features"] });

      const previous = queryClient.getQueryData(["features"]);

      queryClient.setQueryData(["features"], (old) =>
        old.filter((f) => f.id !== id),
      );

      mutatingFeature = previous.find((x) => x.id === id);  

      return { previous };
    },
    onError: (_err, _variables, context) => {
      console.log({ context });
      queryClient.setQueryData(["features"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
  });


  return (
    <ul>
      {features.map((feature) => (
        <li key={feature.id}>
          <div>name: {feature.name}</div>
          <div>creator: {feature.creator}</div>
          <Button
            variant="contained"
            onClick={() => likeMutation.mutate(feature.id)}
          >
            likes: {feature.likes}
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => deleteMutation.mutate(feature.id)}
          >
            Delete
          </Button>
        </li>
      ))}

      {deleteMutation.isPending && (
        <li key={mutatingFeature.id} style={{ opacity: 0.5 }}>
          <div>name: {mutatingFeature.name}</div>
          <div>creator: {mutatingFeature.creator}</div>
          <div>likes: {mutatingFeature.likes}</div>
        </li>
      )}

      {addMutation.isPending && (
        <li key={mutatingFeature.id} style={{ opacity: 0.5 }}>
          <div>name: {mutatingFeature.name}</div>
          <div>creator: {mutatingFeature.creator}</div>
          <div>likes: {mutatingFeature.likes}</div>
        </li>
      )}
    </ul>
  );
};

const addFeatureHandler = async (newFeature: FeatureProps) => {
  const response = await fetch(`${baseURL}/add-feature`, {
    method: "POST",
    body: JSON.stringify(newFeature),
  });

  if (!response.ok) throw new Error("Error in adding new feature");

  return response.json();
};

const App = () => {
  const queryClient = useQueryClient();

  const { isError, data, isLoading } = useQuery({
    queryKey: ["features"],
    queryFn: fetchFeatures,
  });

  const addFeatureMutation = useMutation({
    mutationFn: addFeatureHandler,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
  });

  if (isError) return <h1>Error...</h1>;

  return (
    <>
      <Form handler={addFeatureMutation} />
      <h1>Features: </h1>
      {isLoading ? (
        <SkeletonStructure />
      ) : (
        <Features features={data} addMutation={addFeatureMutation} />
      )}
    </>
  );
};

export default App;
