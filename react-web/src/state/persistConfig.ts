import storage from 'redux-persist/lib/storage';

const persistConfig = {
    // TODO make this unique per user
    key: 'root',
    storage,
};

export default persistConfig;
