import { Response } from 'express';
import { db } from '../config/firebase';
import { User } from '../models/userModel';
import { Request, ResponseStatus } from '../models/dataRequestModel';

const COLLECTION_PATH = 'users';

export const addUser = async (req: Request<User>, res: Response) => {
    const { name, age, hobby } = req.body;

    try {
        const user = db.collection(COLLECTION_PATH).doc();
        const userObject = {
            id: user.id,
            name,
            age,
            hobby: hobby || [],
        };

        await user.set(userObject);

        res.status(ResponseStatus.Success).send({
            status: 'success',
            message: 'entry added successfully',
            data: userObject,
        });
    } catch (err) {
        res.status(ResponseStatus.InternalError).json(err.message);
    }
};

export const getAllUsers = async (req: Request<User>, res: Response) => {
    try {
        const allUsers: User[] = [];
        const querySnapshot = await db.collection(COLLECTION_PATH).get();

        querySnapshot.forEach((doc) => allUsers.push(doc.data() as User));

        return res.status(ResponseStatus.Success).json(allUsers);
    } catch (err) {
        return res.status(ResponseStatus.InternalError).json(err.message);
    }
};

export const updateUser = async (req: Request<User>, res: Response) => {
    const {
        body: { name, age, hobby },
        params: { id },
    } = req;

    try {
        const user = db.collection(COLLECTION_PATH).doc(id);
        const currentData = (await user.get()).data() || {};
        const userObject = {
            id: currentData.id,
            name: name || currentData.name,
            age: age || currentData.age,
            hobby: hobby || currentData.hobby,
        };

        await user.set(userObject).catch((error) => {
            return res.status(ResponseStatus.ClientError).json({
                status: 'error',
                message: error.message,
            });
        });

        return res.status(ResponseStatus.Success).json({
            status: 'success',
            message: 'user information updated successfully',
            data: userObject,
        });
    } catch (err) {
        return res.status(ResponseStatus.InternalError).json(err.message);
    }
};

export const deleteUser = async (req: Request<User>, res: Response) => {
    const { id } = req.params;

    try {
        const user = db.collection(COLLECTION_PATH).doc(id);

        await user.delete().catch((error) => {
            return res.status(ResponseStatus.ClientError).json({
                status: 'error',
                message: error.message,
            });
        });

        return res.status(ResponseStatus.Success).json({
            status: 'success',
            message: 'user has been deleted',
        });
    } catch (err) {
        return res.status(ResponseStatus.InternalError).json(err.message);
    }
};
