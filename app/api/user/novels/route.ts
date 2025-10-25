import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import connectMongo from "@/db/mongoose";
import { INovel, Novel } from "@/model/novel";
import { User } from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session: any = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json('Unauthorized', { status: 401 });
    };

    await connectMongo();
    const id = session.user.id;
    const user = await User.findById(id);

    const novels = []

    for (let index = 0; index < user.novels.length; index++) {
        const novel = user.novels[index];
        if (novel) {
            const novelId = novel.id;
            
            const selectedNovel: INovel | null = await Novel.findOne({id: novelId});
            if (selectedNovel) {
                novels.push(selectedNovel);
            }
        }
    }

    return NextResponse.json(novels, { status: 200 });
}