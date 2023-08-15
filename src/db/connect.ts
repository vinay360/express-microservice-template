import mongoose from 'mongoose';
import {NODE_ENV, MONGODB_URI} from 'config';
import logger from 'utils/logger';

async function connect() {
    if (MONGODB_URI) {
        if (NODE_ENV === 'development') {
            mongoose.set('debug', true);
        }
        await mongoose.connect(MONGODB_URI);
        logger.info('====== Connected to MongoDb ======');
    } else {
        throw new Error('MONGODB_URI is undefined');
    }
}

export default connect;