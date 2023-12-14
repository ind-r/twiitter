import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from '../../../libs/models/userModel'
import mongoConnect from '../../../libs/MongooseConnect'
import { hash } from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const connect = await mongoConnect()
    if (connect) {
      const users : Array<UserType> = await User.find();
      if (users.length !== 0) {
        return NextResponse.json({ users }, { status: 200 })
      }
      return NextResponse.json({ "message": "Users not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
  } catch (err) {

  }
  return NextResponse.json({});
}

interface CreateUserRequestBody {
  username: string;
  password: string;
  nickname: string;
  email: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as CreateUserRequestBody;
    const { username, password, email } = body;
    console.log(body);

    const connect = await mongoConnect(); // Make sure this function returns a Promise that resolves when MongoDB is connected

    // Check if the username already exists
    const existingUser : UserType | null = await User.findOne({ email });

    if (existingUser) {
      console.log(existingUser);
      return NextResponse.json({ "message": "email already exists" }, { status: 409 }); // Conflict
    }
    const newUser = await new User({
      username,
      nickname: username,
      email,
      image: " ",
      password: await hash(password, 12),
    });
    console.log(newUser);

    // Create new user
    const userCreated : UserType | null = await newUser.save();

    return NextResponse.json({ userCreated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 }); // Internal Server Error
  }
}
