import React, {memo, useCallback, useContext, useRef, useState} from "react";
import Input from "@/components/ui/Input";
import MainContext from "@/contexts/MainContext";

const MainInputs = () => {
  const { setQueryParams } = useContext(MainContext)
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const [inputsValue, setInputsValue] = useState({
    position: '',
    location: '',
  });

  const handleSearch = useCallback((newState: {
    location?: string,
    position?: string,
  }) => {
    setQueryParams({
      ...newState,
      page: 1
    })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setInputsValue((prevState) => {

      if (timerRef.current) {
        clearTimeout(timerRef.current as NodeJS.Timeout)
      }

      const newState = {
        ...prevState,
        [name]: value
      }

      timerRef.current = setTimeout(() => {
        handleSearch(newState)
      }, 2000);

      return newState
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
      <Input
        label="Position"
        name="position"
        placeholder="Let us know your position"
        value={inputsValue.position}
        className="lg:col-span-2"
        onChange={handleChange}
      />
      <Input
        label="Location"
        name="location"
        placeholder="Enter your location"
        value={inputsValue.location}
        onChange={handleChange}
      />
    </div>
  )
}

export default memo(MainInputs)