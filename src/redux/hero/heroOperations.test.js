import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import {
  createHero,
  deleteHero,
  getAllHeroes,
  getHeroById,
  updateHero,
} from "./operations.js";
import { heroApi } from "./heroApi.js";

jest.mock("./heroApi.js", () => {
  const original = jest.requireActual("./heroApi.js");
  return {
    ...original,
    heroApi: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
  };
});

const mockStore = configureStore([thunk]);

describe("heroOperations async thunks", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ hero: {} });
    jest.clearAllMocks();
  });

  test("getAllHeroes should dispatch fulfilled action", async () => {
    const mockData = {
      heroes: [{ _id: "1", nickname: "Batman" }],
      totalPages: 1,
    };
    heroApi.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(getAllHeroes({ page: 1, limit: 5 }));
    const actions = store.getActions();

    expect(actions[0].type).toBe("hero/getAll/pending");
    expect(actions[1].type).toBe("hero/getAll/fulfilled");
    expect(actions[1].payload).toEqual(mockData);
  });

  test("getHeroById should return hero data", async () => {
    const mockHero = { _id: "1", nickname: "Spider-Man" };
    heroApi.get.mockResolvedValueOnce({ data: mockHero });

    await store.dispatch(getHeroById("1"));
    const actions = store.getActions();

    expect(actions[0].type).toBe("hero/getById/pending");
    expect(actions[1].type).toBe("hero/getById/fulfilled");
    expect(actions[1].payload).toEqual(mockHero);
  });

  test("createHero should send formData and return new hero", async () => {
    const mockHero = { _id: "2", nickname: "Iron Man" };
    const formData = new FormData();
    formData.append("nickname", "Iron Man");

    heroApi.post.mockResolvedValueOnce({ data: mockHero });

    await store.dispatch(createHero(formData));
    const actions = store.getActions();

    expect(actions[0].type).toBe("hero/create/pending");
    expect(actions[1].type).toBe("hero/create/fulfilled");
    expect(actions[1].payload).toEqual(mockHero);
  });

  test("updateHero should update hero and return updated data", async () => {
    const mockHero = { _id: "1", nickname: "Updated Hero" };
    const formData = new FormData();
    formData.append("nickname", "Updated Hero");

    heroApi.put.mockResolvedValueOnce({ data: mockHero });

    await store.dispatch(updateHero({ id: "1", formData }));
    const actions = store.getActions();

    expect(actions[0].type).toBe("hero/update/pending");
    expect(actions[1].type).toBe("hero/update/fulfilled");
    expect(actions[1].payload).toEqual(mockHero);
  });

  test("deleteHero should remove hero by id", async () => {
    heroApi.delete.mockResolvedValueOnce();

    await store.dispatch(deleteHero("1"));
    const actions = store.getActions();

    expect(actions[0].type).toBe("hero/delete/pending");
    expect(actions[1].type).toBe("hero/delete/fulfilled");
    expect(actions[1].payload).toBe("1");
  });
});
