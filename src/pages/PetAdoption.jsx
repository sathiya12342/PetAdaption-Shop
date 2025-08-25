import React, { useEffect, useMemo, useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaVenusMars, FaSearch } from "react-icons/fa";
import { MOCK_PETS } from "../assets/mockData";


export default function PetAdoption() {
  // filters
  const [q, setQ] = useState("");
  const [species, setSpecies] = useState("All");
  const [gender, setGender] = useState("All");
  const [size, setSize] = useState("All");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  // favorites + modal
  const [favs, setFavs] = useState(() => new Set(JSON.parse(localStorage.getItem("petFavs") || "[]")));
  const [selected, setSelected] = useState(null); // selected pet for modal
  const [showAdopt, setShowAdopt] = useState(false);
  const [adopter, setAdopter] = useState({ name: "", phone: "", note: "" });

  useEffect(() => {
    localStorage.setItem("petFavs", JSON.stringify([...favs]));
  }, [favs]);

  const filteredPets = useMemo(() => {
    return MOCK_PETS.filter(p => {
      const matchesQ =
        q.trim() === "" ||
        [p.name, p.breed, p.location, p.species].some(v => v.toLowerCase().includes(q.toLowerCase()));
      const matchesSpecies = species === "All" || p.species === species;
      const matchesGender = gender === "All" || p.gender === gender;
      const matchesSize = size === "All" || p.size === size;
      const matchesMin = minAge === "" || p.age >= Number(minAge);
      const matchesMax = maxAge === "" || p.age <= Number(maxAge);
      return matchesQ && matchesSpecies && matchesGender && matchesSize && matchesMin && matchesMax;
    });
  }, [q, species, gender, size, minAge, maxAge]);

  const toggleFav = (id) => {
    setFavs(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const openDetails = (pet) => {
    setSelected(pet);
    setShowAdopt(false);
  };

  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    const payload = {
      petId: selected.id,
      petName: selected.name,
      ...adopter,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("adoptionRequests") || "[]");
    existing.push(payload);
    localStorage.setItem("adoptionRequests", JSON.stringify(existing));
    setAdopter({ name: "", phone: "", note: "" });
    setShowAdopt(false);
    alert("Request sent! Shelter will contact you soon ✅");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Find Your New Best Friend 🐾</h1>
            <p className="text-gray-600 mt-2">Search, filter, and adopt pets near you.</p>
          </div>
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-3.5" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, breed, city..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <select className="border rounded-lg p-2" value={species} onChange={(e)=>setSpecies(e.target.value)}>
            <option>All</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
          </select>
          <select className="border rounded-lg p-2" value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <select className="border rounded-lg p-2" value={size} onChange={(e)=>setSize(e.target.value)}>
            <option>All</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <input type="number" min="0" placeholder="Min age" className="border rounded-lg p-2"
                 value={minAge} onChange={e=>setMinAge(e.target.value)} />
          <input type="number" min="0" placeholder="Max age" className="border rounded-lg p-2"
                 value={maxAge} onChange={e=>setMaxAge(e.target.value)} />
          <button
            onClick={() => { setSpecies("All"); setGender("All"); setSize("All"); setMinAge(""); setMaxAge(""); setQ(""); }}
            className="border rounded-lg p-2 hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {filteredPets.length === 0 ? (
          <div className="text-center text-gray-600 py-16">No pets match your filters 😿</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                isFav={favs.has(pet.id)}
                onFav={() => toggleFav(pet.id)}
                onOpen={() => openDetails(pet)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Details / Adopt Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
            <div className="relative">
              <img src={selected.image} alt={selected.name} className="w-full h-60 object-cover" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-bold">{selected.name}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                <Badge>{selected.species}</Badge>
                <Badge>{selected.breed}</Badge>
                <Badge><FaVenusMars className="inline mr-1" /> {selected.gender}</Badge>
                <Badge>{selected.size}</Badge>
                <Badge>{selected.age} yrs</Badge>
                <Badge><FaMapMarkerAlt className="inline mr-1" /> {selected.location}</Badge>
              </div>

              {!showAdopt ? (
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setShowAdopt(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700"
                  >
                    Start Adoption
                  </button>
                  <button
                    onClick={() => toggleFav(selected.id)}
                    className="px-4 py-2 rounded-xl border hover:bg-gray-50"
                  >
                    <FaHeart className={`inline mr-2 ${favs.has(selected.id) ? "text-red-500" : ""}`} />
                    {favs.has(selected.id) ? "Saved" : "Save"}
                  </button>
                </div>
              ) : (
                <form className="pt-2 space-y-3" onSubmit={handleAdoptSubmit}>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      className="border rounded-lg p-2"
                      placeholder="Your full name"
                      value={adopter.name}
                      onChange={e=>setAdopter(s=>({...s, name: e.target.value}))}
                      required
                    />
                    <input
                      className="border rounded-lg p-2"
                      placeholder="Phone / WhatsApp"
                      value={adopter.phone}
                      onChange={e=>setAdopter(s=>({...s, phone: e.target.value}))}
                      required
                    />
                  </div>
                  <textarea
                    className="border rounded-lg p-2 w-full"
                    rows={3}
                    placeholder="Tell us about your home, experience, etc."
                    value={adopter.note}
                    onChange={e=>setAdopter(s=>({...s, note: e.target.value}))}
                  />
                  <div className="flex items-center gap-3">
                    <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700">
                      Submit Request
                    </button>
                    <button type="button" onClick={()=>setShowAdopt(false)} className="px-4 py-2 rounded-xl border">
                      Back
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- small reusable components --- */
function PetCard({ pet, isFav, onFav, onOpen }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img src={pet.image} alt={pet.name} className="w-full h-52 object-cover" />
        <button
          onClick={onFav}
          className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm"
          title={isFav ? "Remove from saved" : "Save"}
        >
          <FaHeart className={`${isFav ? "text-red-500" : "text-gray-500"}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{pet.name}</h3>
        <p className="text-gray-600 text-sm">{pet.breed} • {pet.age} yrs • {pet.gender}</p>
        <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
          <FaMapMarkerAlt /> {pet.location}
        </p>
        <button
          onClick={onOpen}
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">{children}</span>;
}
