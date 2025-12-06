import styles from './WeatherCard.module.scss'

import { AppDispatch } from '@/store/store'
import { removeCity } from '@/store/slices/citiesSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { ICity } from '@/shared/types/city.type'
import { IWeatherResponse } from '@/shared/types/weatherResponse.type'
import { useRouter } from 'next/navigation'

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
		setLoading(true)

		fetch(
			`https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
		)
			.then((res) => res.json())
			.then((data: IWeatherResponse) => {
				setTempData(data)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchWeather()
	}, [])

	function handleRemoveCity(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		event.preventDefault()
		dispatch(removeCity(city.name))
	}

	return (
		<div
			className={styles.card}
			onClick={() => router.push(`/${city.name}`)}
		>
			<h2 className={styles.card_header}>{city.name}</h2>
			{isLoading ? (
				<p>Loading...</p>
			) : !tempData ? (
				<p>No temperature data</p>
			) : (
				<>
					<p className={styles.temperature}>
						{Math.round(tempData.current.temp)}°C
					</p>
					<p className={styles.feels_like}>
						Feels like: {Math.round(tempData.current.feels_like)}°C
					</p>
				</>
			)}
			<div className={styles.card_controls}>
				<button
					className={`${styles.control_btn} ${styles.remove_btn}`}
					onClick={handleRemoveCity}
				>
					Remove
				</button>
				<button
					className={`${styles.control_btn} ${styles.update_btn}`}
					onClick={(e) => {
						e.stopPropagation()
						fetchWeather()
					}}
				>
					Update
				</button>
			</div>
		</div>
	)
}
