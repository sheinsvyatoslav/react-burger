import { expect } from "@jest/globals";
import fetchMock from "fetch-mock";

import wsReducer, { initialState } from "./websocket";

describe("WS reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Check initial state", () => {
    expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
  });
});
