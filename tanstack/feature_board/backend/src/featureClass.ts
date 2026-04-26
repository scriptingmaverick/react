import { FeatureProps } from "../main.ts";

export class Feature {
  #features: FeatureProps[];
  #nextId: string;
  constructor(initialData: FeatureProps[]) {
    this.#features = initialData;
    this.#nextId = this.getRandomId();
  }

  getRandomId() {
    return `post-${Date.now()}-${Math.round(Math.random() * 100)}`;
  }

  addFeature(feature: FeatureProps) {
    feature.id = this.#nextId;
    feature.likes = 0;

    this.#nextId = this.getRandomId();
    this.#features.push(feature);
  }

  removeFeature(id: string) {
    this.#features = this.#features.filter((x) => x.id !== id);
  }

  upVote(id: string) {
    this.#features = this.#features.map((feature) => {
      const res =
        feature.id === id ? { ...feature, likes: feature.likes + 1 } : feature;

      console.log({ res, id, feature });

      return res;
    });

    console.log(this.#features);
  }

  getFeatures() {
    return this.#features.map((x) => structuredClone(x));
  }
}
