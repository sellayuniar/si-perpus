import Layout from "@/widget/Layout";
import IkonUbah from "@/assets/IkonUbah";
import IkonHapus from "@/assets/IkonHapus";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  // buat state untuk menyimpan data buku
  const [buku, setBuku] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const addBookHandler = () => {
    router.push("/tambah-buku");
  };

  const updateBookHandler = (id) => {
    router.push(`/ubah-buku/${id}`);
  };

  //buat variable untuk menyimpan data collection
  const bukuCollectionRef = collection(db, "buku");

  //get buku list
  const getBukuList = async () => {
    try {
      const data = await getDocs(bukuCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      setBuku(filteredData);
      console.log(buku);
    } catch (err) {
      console.error(err);
    }
  };

  //panggil getBukuList dalam useEffect
  useEffect(() => {
    getBukuList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // menghapus dokumen
  const deleteBuku = async (id) => {
    const bukuDoc = doc(db, "buku", id);
    await deleteDoc(bukuDoc);
    getBukuList();
  };

  return (
    <Layout>
      <div className="ml-2 flex items-center justify-center">
        <div>
          {/* judul */}
          <div className="mb-8 mt-10">
            <h3 className="text-2xl font-bold">Data Buku Perpustakaan</h3>
          </div>

          <div className="flex items-center justify-between">
            {/* button tambah */}
            <button
              className="mt-3 h-12 w-56 rounded-full bg-sky-500 py-3 text-white hover:bg-sky-700"
              onClick={addBookHandler}
            >
              Tambah Buku
            </button>

            {/* search */}
            <div className="flex items-center justify-end">
              <input
                type="text"
                className="w-42 mt-2 block
                  rounded-xl border px-3 py-2"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ketik keyword"
              />
            </div>
          </div>
          {/* table */}
          <div className="mt-5">
            <table className="table-auto rounded-xl bg-sky-50 py-10">
              <thead className="mx-3 border-b-4">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Buku
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pengarang
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deskripsi Buku
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tahun Terbit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {buku.length >= 1 ? (
                  buku
                    .filter((data) =>
                      data.nama_buku?.toLowerCase().includes(search)
                    )
                    .map((data) => (
                      <tr className="hover:bg-sky-200" key={data.id}>
                        <td scope="col" className="px-6 py-3">
                          {data.nama_buku}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {data.pengarang}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {data.deskripsi_buku}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {data.tahun_terbit}
                        </td>
                        <td scope="col" className="flex px-6 py-3">
                          <span
                            className="hover: mr-2 h-8 w-8 cursor-pointer
                    hover:text-sky-500"
                            onClick={() => {
                              updateBookHandler(data.id);
                            }}
                          >
                            <IkonUbah />
                          </span>
                          <span
                            className="h-8 w-8 cursor-pointer hover:text-red-500"
                            onClick={() => {
                              deleteBuku(data.id);
                            }}
                          >
                            <IkonHapus />
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td className="py-5 text-center" colSpan={6}>
                      Belum ada data buku!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
