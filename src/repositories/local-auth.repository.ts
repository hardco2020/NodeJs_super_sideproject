import crypto from 'crypto'; //加密方法
import {LocalAuthDocument,LocalAuthModel} from '../models/local-auth.model'

export class LocalAuthRepository {
    //hash實作方法
    public hashPassword(
        password: string,
        salt = crypto.randomBytes(16).toString('hex') //原本是binary 要換成16進制？
      ): { salt: string, hash: string } {
          //生成鹽之後生成密碼
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        return { salt, hash };
    }

    public async addUser(
        username:string,
        password:string,
        email:string
    ):Promise<LocalAuthDocument>{
        //要加入雜湊實作
        const { salt, hash } = this.hashPassword(password);
        const user = new LocalAuthModel({
            username,
            password:{salt,hash},
            email
        });
        const document = await user.save();
        return document;
    }
    
    public async getUser(
        options:{username?: string,email?: string} //? marks the member as being optional in the interface. 
    ): Promise<LocalAuthDocument|null>{
        const params = Object.keys(options) //user或email都可以
                   .filter(key => !!(options as any)[key]) //看有沒有存在此序列
                   .map(key => { //存在的話就將其兩者配對回傳
                     return { [key]: (options as any)[key] };
                   });
        console.log("看一下驗證get",params)
        const getCondition = () => {
            if ( params.length > 1 ) {
              return {
                $or: params
              };
            }
            return params[0];
        };
        const user = await LocalAuthModel.findOne(getCondition());
        return user;
    }




}