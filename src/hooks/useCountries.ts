import { useQuery } from "@tanstack/react-query";

const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
  const data = await res.json();
  return data.map((country: any) => {
    return {
      label: country.name.common,
      value: country.name.common,
    };
  });
};

const useCountries = () => {
  const { data: allCountries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  return { allCountries };
};

export default useCountries;
