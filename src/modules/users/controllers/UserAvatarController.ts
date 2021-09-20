import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController{

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  public async update(request:Request,response:Response):Promise<Response>{

    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id:request.user.id,
      avatarFilename:request.file?.filename,
    })

    return response.json(user);
  }
}
