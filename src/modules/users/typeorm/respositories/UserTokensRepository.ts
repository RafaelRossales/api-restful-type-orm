import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken>{

  /**
   *@description
   * @param token
   */
  public async findByToken(token:string):Promise<UserToken | undefined>{

    const userToken = await this.findOne({
      where:{
        token,
      }
    })

    return userToken;
  }

    /**
   *@description
   * @param email
   */
  public async generateToken(user_id:string):Promise<UserToken>{

    const userToken = await this.create({ user_id });

    await this.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
