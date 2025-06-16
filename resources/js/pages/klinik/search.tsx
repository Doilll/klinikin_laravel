import ClinicCard from "@/components/clinic-card";

export default function Search({ clinics, filters }: any) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Hasil Pencarian</h1>
      <p className="mb-2 text-sm text-gray-600">
        Menampilkan hasil untuk <strong>{filters.search}</strong> di{' '}
        <strong>{filters.kota}</strong>
      </p>

      {clinics.length === 0 ? (
        <p className="text-gray-500">Tidak ada klinik ditemukan.</p>
      ) : (
        clinics.map((clinic: any) => (
          <ClinicCard
            key={clinic.id}
            id={clinic.id}
            image={clinic.image}
            namaKlinik={clinic.name_klinik}
            address={clinic.address}
            acceptedBPJS={clinic.accepted_bpjs}
          />
        ))
      )}
    </>
  );
}
