class GasType {
    constructor(name, id=undefined) {
        this.name = name;
        this.id = id;
    }

    toJson() {
        return {
            name: this.name
        }
    }

    editGasType(gastypeDto) {
        this.name = gastypeDto.name ? gastypeDto.name : this.name;
    }

    static create(name, id=undefined) {
        if(!name) {
            throw new Error('Invalid gas type data');
        }

        return new GasType(name, id);
    }
}

module.exports = GasType