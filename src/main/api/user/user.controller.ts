import { ControllerBase } from '../../../bases/controller.base';
import { UserService} from './user.service'
import { ResponseObject } from '../../../common/response/response.object';
import { Request, Response, NextFunction } from 'express';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { HttpStatus } from '../../../types/response.type';
import { LocalAuthDocument } from '../../../models/local-auth.model';

export class UserController extends ControllerBase {
    //只有管理者或者user才能使用token

    private readonly userSvc = new UserService();
    public async updateUser(req: Request): Promise<ResponseObject<LocalAuthDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        //一連串的資料集合
        console.log(req.body);
        const dto = await this.userSvc.updateUser(payload,req.body);//觸發service
        return this.formatResponse(dto, HttpStatus.OK);
    }
    public async getUser(req:Request):Promise<ResponseObject<LocalAuthDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const {id} = req.params
        //console.log(id)
        const dto = await this.userSvc.getUserbyId(id);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async followUser(req:Request):Promise<ResponseObject<string>>{
        //使用者本身id放在token內
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        //要追隨的人的id放在params
        const {id} = req.params
        console.log(id)
        const dto = await this.userSvc.followUser(payload,id);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async unfollowUser(req:Request):Promise<ResponseObject<string>>{
        //使用者本身id放在token內
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        //要追隨的人的id放在params
        const {id} = req.params
        console.log(id)
        const dto = await this.userSvc.unfollowUser(payload,id);
        return this.formatResponse(dto,HttpStatus.OK);
    }
}

