import Link from "next/link";
import { FaSpotify } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { MdMarkunreadMailbox, MdOutlineDownloadForOffline } from "react-icons/md";

export const Header = () => {
    return (
        <header className="flex py-2 px-6 items-center text-gray-300 gap-2">
            <div className="flex items-center gap-8">
                <FaSpotify color="white" size={32} />

                <Link className="bg-zinc-800 p-3 rounded-full" href="/">
                    <GoHome size={24} />
                </Link>
            </div>

            <div className="w-[426px] bg-zinc-800 flex items-center rounded-3xl p-2">
                <IoSearch size={28} />
                <input type="text" className="flex-1" placeholder="O que você quer ouvir?" />
                <div className="pl-2 border-l border-solid border-white">
                  <MdMarkunreadMailbox size={28} />
                </div>
            </div>

            {/* Links */}
            <div className="flex gap-4 items-center">
                <Link href="/">Premium</Link>
                <Link href="/">Suporte</Link>
                <Link href="/">Baixar</Link>

                <div className="h-full w-[1px] bg-white">.</div>

                <Link href="/" className="text-[14px] flex gap-2 items-center">
                    <MdOutlineDownloadForOffline size={16} />{' '} Instalar aplicativo
                </Link>
                <Link href="/" className="text-[14px]">
                    Inscrever-se
                </Link>
                <Link href="/" className="text-[14px] bg-white rounded-full py-3 px-8 text-black font-bold">
                    Entrar
                </Link>
            </div>
        </header>
    );
};
