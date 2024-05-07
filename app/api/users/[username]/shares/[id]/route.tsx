import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from '../../../../../../libs/models/userModel'
import mongoConnect from '../../../../../../libs/MongooseConnect'

export async function GET(request: NextRequest, { params }: { params: { username: string, id: string } }) {
  const { username, id } = params;
  try {
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        const index = user.shares.indexOf(id);
        if (index !== -1) {
          return NextResponse.json({ "found": true }, { status: 200 })
        }
        return NextResponse.json({ "found": false }, { status: 200 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest, { params }: { params: { username: string, id: string } }) {
  const { username, id } = params;
  try {
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        const index = user.shares.indexOf(id);
        if (index !== -1) {
          user.shares.splice(index, 1)
          user.save();
          return NextResponse.json({ "message": "tweets removed from shares" }, { status: 200 })
        }
        return NextResponse.json({ "message": "TWEET NOT FOUND" }, { status: 404 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

