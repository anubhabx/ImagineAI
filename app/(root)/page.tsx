import { Collection } from "@/components/shared/Collection";
import { sidebarLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash your creative heading with Imaginify.
        </h1>
        <ul className="flex items-start justify-center w-full gap-20 mt-5">
          {sidebarLinks.slice(0, 5).map((link) => (
            <Link
              key={link.route}
              className="flex-center flex-col gap-2"
              href={link.route}
            >
              <li className="flex-center min-w-max rounded-full bg-white p-4">
                <Image
                  src={link.icon}
                  alt={link.route}
                  width={24}
                  height={24}
                />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
