import { FaPlus } from "react-icons/fa6";
import { LuLibrary } from "react-icons/lu";
import { asideLinks } from "../utils/const";
import Link from "next/link";

const hasPlaylist = false;

export const Aside = () => {
    return (
        <div className="bg-zinc-900 min-h-full w-1/3 rounded-md">
            <div className="flex flex-col">
                <div className="flex py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <LuLibrary size={24} />
                        <h2>Sua biblioteca</h2>
                    </div>
                    <FaPlus size={16} />
                </div>
                <div>
                    {hasPlaylist ? (
                        <div className="flex flex-col">
                            <h3>Crie sua primeira playlist</h3>
                            <p>É fácil, vamos te ajudar</p>
                            <button className="">Criar playlist</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    {asideLinks.map(({id, label, url}) => (
                        <Link key={id} href={url}>{label}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
