'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import { AppDispatch } from '@/store/store'
import { removeCity } from '@/store/slices/citiesSlice'
import { resetCursor, setCursorHover } from '@/store/slices/cursorSlice'
import { ICity } from '@/shared/types/city.type'
import { IWeatherResponse } from '@/shared/types/weatherResponse.type'
import { WeatherCardView } from './WeatherCardView'

interface Props {
	city: ICity
}

export function WeatherCard({ city }: Props) {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

	const [tempData, setTempData] = useState<IWeatherResponse | null>(null)
	const [isLoading, setLoading] = useState(false)

	const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

	const fetchWeather = () => {
		if (!API_KEY) return

		setLoading(true)

		fetch(
			`https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
		)
			.then((res) => res.json())
			.then((data: IWeatherResponse) => setTempData(data))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		fetchWeather()
	}, [city.name])

	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		e.preventDefault()
		dispatch(removeCity(city.name))
	}

	const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		fetchWeather()
	}

	return (
		<WeatherCardView
			cityName={city.name}
			isLoading={isLoading}
			tempData={tempData}
			onClick={() => router.push(`/${city.name}`)}
			onRemove={handleRemove}
			onUpdate={handleUpdate}
			onMouseEnter={() => dispatch(setCursorHover('#353535ff'))}
			onMouseLeave={() => dispatch(resetCursor())}
		/>
	)
}
