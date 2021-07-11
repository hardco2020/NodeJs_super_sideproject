import { RouteBase } from '../../bases/route.base';
import { TodoRoute } from './todo/todo.routing';
import JWT from 'express-jwt';
export class ApiRoute extends RouteBase {

  private todoRoute = new TodoRoute();
  constructor() {
    super();
    //this.first();
  }
  protected initial():void{
    this.todoRoute = new TodoRoute();
    super.initial();
  }
  protected registerRoute(): void {
    //非會員不能使用 用guard擋住
    this.router.use(
        JWT( //需要驗證 如果驗證不通過 接到jwt exceptions
          {
            secret: (process.env.JWT_SIGN as string),//簽章用
            //secret: process.env.JWT_SIGN 這樣寫會錯 系統認不出jwt_sign是什麼型態
            userProperty: 'payload',//解碼過後要assign給的名稱  //使用者資訊屬性名稱
            algorithms: ['HS256']  //加密演算法
          }
        )
    );
    console.log("密碼"+process.env.JWT_SIGN)
    this.router.use('/todos', this.todoRoute.router);
  }

}