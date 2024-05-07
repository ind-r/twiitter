import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from '../../../../../libs/models/userModel'
import mongoConnect from '../../../../../libs/MongooseConnect'

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  try {
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        return NextResponse.json({ shares: user.shares }, { status: 200 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
  } catch (err) {

    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  const body = await request.json();
  const { id } = body;
  try {
    // console.log(body);
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        // const shares = user.shares;
        // shares.push(id);
        // user.shares = shares;
        user.shares.push(id);
        user.save();
        return NextResponse.json({ shares: user.shares }, { status: 200 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
    // return NextResponse.json({ id }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ "message": err }, { status: 500 })
  }
}

// export async function POST(request: NextRequest, { params }: { params: { username: string} }) {
//   const body = await request.json();
//   const { username } = params;
//   const { id } = body;
//   try {
//     const connect = await mongoConnect()
//     if (connect) {
//       const user: UserType | null = await User.findOne({ username });
//       if (user) {
//         user.likes.push(id);
//         user.save();
//         return NextResponse.json({ "message": "tweet added to likes" }, { status: 200 })
//       }
//       return NextResponse.json({ "message": "User not found" }, { status: 404 })
//     }
//     return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }
