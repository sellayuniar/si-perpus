import { useState, useEffect } from "react";
import Layout from "@/widget/Layout";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const UbahBuku = () => {
  const [namaBuku, setNamaBuku] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [deskripsiBuku, setDeskripsiBuku] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");

  const router = useRouter();

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      const getBukuListById = async () => {
        const bukuDocRef = doc(db, "buku", id);
        try {
          const docSnap = await getDoc(bukuDocRef);
          const dataBuku = docSnap.data();
          setNamaBuku(dataBuku.nama_buku);
          setPengarang(dataBuku.pengarang);
          setDeskripsiBuku(dataBuku.deskripsi_buku);
          setTahunTerbit(dataBuku.tahun_terbit);
          console.log(dataBuku);
        } catch (err) {
          console.error(err);
        }
      };
      getBukuListById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleUpdate = async (e) => {
    const { id } = router.query;
    const bukuDocRef = doc(db, "buku", id);
    e.preventDefault();
    try {
      await updateDoc(bukuDocRef, {
        nama_buku: namaBuku,
        pengarang: pengarang,
        deskripsi_buku: deskripsiBuku,
        tahun_terbit: tahunTerbit,
      });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="ml-10 flex justify-center">
        <div className="m-10 w-[550px] rounded-lg p-10 pt-2 shadow-lg shadow-gray-200">
          {/* judul */}
          <div className="mb-8 mt-10">
            <h3 className="text-2xl font-bold">Form Ubah Buku</h3>
          </div>
          {/* form ubah */}
          <div>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="text-md">Nama Buku</label>
                <input
                  type="text"
                  name="nama_buku"
                  className="mt-2 block w-10/12
                            rounded-xl border px-3 py-2"
                  onChange={(event) => {
                    setNamaBuku(event.target.value);
                  }}
                  value={namaBuku}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Pengarang</label>
                <input
                  type="text"
                  name="pengarang"
                  className="mt-2 block w-10/12
                  rounded-xl border px-3 py-2"
                  onChange={(event) => {
                    setPengarang(event.target.value);
                  }}
                  value={pengarang}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Deskripsi Buku</label>
                <input
                  type="text"
                  name="deskripsi_buku"
                  className="mt-2 block w-10/12
                  rounded-xl border px-3 py-2"
                  onChange={(event) => {
                    setDeskripsiBuku(event.target.value);
                  }}
                  value={deskripsiBuku}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Tahun Terbit</label>
                <input
                  type="number"
                  name="tahun_terbit"
                  className="mt-2 block w-10/12
                  rounded-xl border px-3 py-2"
                  maxLength={4}
                  onChange={(event) => {
                    setTahunTerbit(event.target.value);
                  }}
                  value={tahunTerbit}
                  required
                />
              </div>
              <div className="ml-24">
                {/* button tambah */}
                <Button title="Simpan Perubahan" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UbahBuku;
