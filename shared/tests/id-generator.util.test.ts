import { v7 as uuidv7 } from "uuid";
import { IdGenerator, UuidIdGenerator } from "../src/id-generator.util";

jest.mock("uuid", () => ({
  v7: jest.fn(),
}));

describe("UuidIdGenerator", () => {
  let uuidIdGenerator: IdGenerator;

  beforeEach(() => {
    uuidIdGenerator = new UuidIdGenerator();
  });

  it("should generate a valid UUID", () => {
    // Given
    const expectedUuid = "123e4567-e89b-12d3-a456-426614174000";
    (uuidv7 as jest.Mock).mockReturnValue(expectedUuid);

    // When
    const generatedUuid = uuidIdGenerator.generateId();

    console.log(generatedUuid);
    // Then
    expect(generatedUuid).toBe(expectedUuid);
    expect(uuidv7).toHaveBeenCalledTimes(1);
  });
});
