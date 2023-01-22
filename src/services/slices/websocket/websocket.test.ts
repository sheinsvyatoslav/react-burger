import fetchMock from "fetch-mock";
import { expect } from "@jest/globals";

import wsReducer, { initialState } from "./websocket";

describe("WS reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Check initial state", () => {
    expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
  });
});
