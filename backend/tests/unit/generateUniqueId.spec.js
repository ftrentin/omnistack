const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('deveria gerar um número ID único com tamanho 8', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});
