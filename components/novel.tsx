import { INovel } from "@/model/novel";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "./ui/card";
import { FaBook } from "react-icons/fa";

export default function Novel({ novel }: { novel: INovel }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer w-[250px] h-[400px]"
            onClick={() => window.location.href = `/novels/${novel._id}`}
        >
            <Card className="overflow-hidden h-full py-0">
                <img src={novel.cover} alt={novel.title} className="w-full h-[260px] object-cover" />
                <CardContent>
                    <h2 className="text-lg font-semibold">{novel.title}</h2>
                    <p className="text-sm text-muted-foreground">{novel.author}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                    <FaBook className="inline mr-1" /> {novel.genre}
                </CardFooter>
            </Card>
        </motion.div>
    )
}