import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../db/models/user";
import Blacklist from "../db/models/blacklist";
import {
    LoginParams,
    RefreshParams,
    UserAndCredentials,
    UserCreationParams
} from "./models/auth-models";

import { 
    BadRequestError, 
    UnauthorizedError
} from "../errors";

// import AuthenticatedUser from "../middleware/models/authenticated-user";

export default class AuthService {
    public async register(
       params: UserCreationParams 
    ): Promise<UserAndCredentials> {
        const user = await User.create(params);
        const uuid = uuidv4();
        const token = user.createJWT(uuid);
        const refresh = user.createRefresh(uuid);
        if (!user){
            throw new BadRequestError();
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
            },
            token,
            refresh,
        };
    }

    public async login( params: LoginParams): Promise<UserAndCredentials> {
        const user = await User.findOne({ username: params.username });
        if(!user){
            throw new UnauthorizedError();
        }
        const verifyPassword = await user.comparePassword(params.password);
        if(!verifyPassword){
            throw new UnauthorizedError();
        }
        const uuid = uuidv4();
        const token = user.createJWT(uuid);
        const refresh = user.createRefresh(uuid);

        return{
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
            },
            token,
            refresh,
        };
    }

    public async logout(jti: string): Promise<void> {
        await Blacklist.create({ object: jti, kind: "jti" });
    }

    public async refresh(
        params: RefreshParams,
        // user: AuthenticatedUser
    ): Promise<UserAndCredentials> {
        const decodedRefreshToken = jwt.verify(
            params.refreshToken,
            process.env.REFRESH_SECRET
        ) as {
            userId: string;
            username: string;
            iss: string;
            jti: string;
        };
        // make sure the token is not blacklisted
        const blacklisted = await Blacklist.findOne({
            object: decodedRefreshToken.jti,
            kind: "jti",
        });
        if (blacklisted) {
            throw new UnauthorizedError("Token has already been blacklisted");
        }
              
        // blacklist the current jti(from the request body) of the refresh token so it cannot be reused
        await Blacklist.create({ object: decodedRefreshToken.jti });
              
        const user = await User.findById(decodedRefreshToken.userId);
              
        if (!user) {
            throw new BadRequestError("user not found");
        }
              
        const uuid = uuidv4();
        const newToken = user.createJWT(uuid);
        const newRefresh = user.createRefresh(uuid);
              
        return {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
            },
            token: newToken,
            refresh: newRefresh,
        };
            
    }
}