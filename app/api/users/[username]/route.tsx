import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from '../../../../libs/models/userModel'
import mongoConnect from '../../../../libs/MongooseConnect'

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  try {
    const connect = await mongoConnect()
    if (connect) {
      const user : UserType | null = await User.findOne({ username });
      if (user) {
        return NextResponse.json({ user }, { status: 200 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
  } catch (err) {

  }
  return NextResponse.json({});
}
