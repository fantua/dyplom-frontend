const POINT = 'AppUser';

const initialState = {
    token: null,
};

class User {

    _model = {};

    constructor() {
        const model = window.localStorage.getItem(POINT);

        Object.assign(this._model, initialState, JSON.parse(model));
    }

    set token(value) {
        this._model.token = value;
    }

    get token() {
        return this._model.token;
    }

    set(property, value) {
        this._model[property] = value;
    }

    get(property) {
        return this._model[property];
    }

    isLoggedIn() {
        return !!this.token;
    }

    save(attrs) {
        if (attrs) {
            Object.assign(this._model, attrs);
        }

        localStorage.setItem(POINT, JSON.stringify(this._model));
    }

    saveToken(value) {
        this.save({
            token: value,
        });
    }

    clear() {
        localStorage.clear();

        this._model = Object.assign({}, initialState);
    }

}

export default new User();