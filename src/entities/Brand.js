class Brand {

    constructor(name, id=undefined) {
        this.name = name;
        this.id = id;
    }

    toJson() {
        return {
            name: this.name
        }
    }

    editBrand(brandDto) {
        this.name = brandDto.name ? brandDto.name : this.name;
    }

    static create(name, id=undefined) {
        if(!name) {
            throw new Error('Invalid brand data');
        }

        return new Brand(name, id);
    }
}

module.exports = Brand