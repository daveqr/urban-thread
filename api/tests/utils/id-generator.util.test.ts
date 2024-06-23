import {v4 as uuidv4} from 'uuid';
import {IdGenerator, UuidIdGenerator} from "../../src/utils/id-generator.util";

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

describe('UuidIdGenerator', () => {
    let uuidIdGenerator: IdGenerator;

    beforeEach(() => {
        uuidIdGenerator = new UuidIdGenerator();
    });

    it('should generate a valid UUID', () => {
        // Given
        const expectedUuid = '123e4567-e89b-12d3-a456-426614174000';
        (uuidv4 as jest.Mock).mockReturnValue(expectedUuid);

        // When
        const generatedUuid = uuidIdGenerator.generateId();

        // Then
        expect(generatedUuid).toBe(expectedUuid);
        expect(uuidv4).toHaveBeenCalledTimes(1);
    });
});
