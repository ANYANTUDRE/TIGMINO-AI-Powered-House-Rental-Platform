const citiesInMorocco = [
    { label: 'Agadir', value: 'agadir' },
    { label: 'Aït Melloul', value: 'aitmelloul' },
    { label: 'Beni Mellal', value: 'benimellal' },
    { label: 'Casablanca', value: 'casablanca' },
    { label: 'Dakhla', value: 'dakhla' },
    { label: 'El Jadida', value: 'eljadida' },
    { label: 'Fes', value: 'fes' },
    { label: 'Guelmim', value: 'guelmim' },
    { label: 'Inezgane', value: 'inezgane' },
    { label: 'Kénitra', value: 'kenitra' },
    { label: 'Khouribga', value: 'khouribga' },
    { label: 'Ksar El Kebir', value: 'ksarelkebir' },
    { label: 'Laayoune', value: 'laayoune' },
    { label: 'Marrakech', value: 'marrakech' },
    { label: 'Meknes', value: 'meknes' },
    { label: 'Mohammedia', value: 'mohammedia' },
    { label: 'Nador', value: 'nador' },
    { label: 'Oujda', value: 'oujda' },
    { label: 'Rabat', value: 'rabat' },
    { label: 'Safi', value: 'safi' },
    { label: 'Salé', value: 'sale' },
    { label: 'Tangier', value: 'tangier' },
    { label: 'Taza', value: 'taza' },
    { label: 'Tétouan', value: 'tetouan' },
    
];


const useMoroccanCities = () => {
    const getAll = () => citiesInMorocco;

    const getByValue = (value: string) => {
        return citiesInMorocco.find((city) => city.value === value);
    };

    return {
        getAll,
        getByValue
    };
};

export default useMoroccanCities;
