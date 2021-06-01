import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PrivateKeyInput } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/DTO/create-user.dto';
import { GetAllUserSongsDTO } from 'src/DTO/get-all-user-songs.dto';
import { UserRoles } from 'src/enum/user-roles.enum';
import { Song } from 'src/interface/song.interface';
import { User } from 'src/interface/user.interface';
import { uuid } from 'uuidv4';
import { sha256 } from 'js-sha256';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,

    @InjectModel('Song')
    private songModel: Model<Song>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const query = this.userModel.find();
    query.populate('song');

    const result = await query;
    if (result) {
      return result.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        registrationDate: user.registrationDate,
        role: user.role,
      }));
    } else {
      return [];
    }
  }

  async getAllUserSongs(id: string) {
    const result = this.songModel.find();

    result.where('author').equals(id);
    console.log('resultresult', result, id);

    return await result;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { name, email, password } = data;
    // We generate random addition to password, for making it stronger
    // const salt = String((Math.random() + Math.random()) * 10);

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      name,
      email,
      password: hashedPass,
      role: UserRoles.guest,
      registrationDate: new Date(),
      salt,
    });

    await createdUser.save();

    return {
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      role: createdUser.role,
      registrationDate: createdUser.registrationDate,
    };
  }
  async loginUser(email, password) {
    const findUser = this.userModel.findOne();
    findUser.where('email').equals(email);

    findUser.select('id name email, password');
    const foundUser = await findUser;

    // const hashedPass = findUser.where('password').equals(sha256(password));
    // const hashedPass = sha256(password + foundUser.salt);
    const isPasswordMatch = bcrypt.compare(password, foundUser.password);

    if (!foundUser) {
      return false;
    }

    if (isPasswordMatch) {
      const token = String(Math.random()) + String(uuid());

      await this.userModel.findByIdAndUpdate(foundUser.id, { token });
      return {
        foundUser,
        token,
      };
    }

    return false;
  }

  async findUserByToken(token: string): Promise<User> {
    const findUser: User = await this.userModel.findOne({
      token,
    });

    if (findUser) {
      return findUser;
    } else {
      return null;
    }
  }
}
