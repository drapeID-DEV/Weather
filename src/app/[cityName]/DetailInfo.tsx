'use client'

import styles from './DetailInfo.module.scss'

import { Header } from '@/components/Header'
import { CITIES } from '@/shared/data/cities.data'
import { ICity } from '@/shared/types/city.type'
import { IWeatherResponse } from '@/shared/types/weatherResponse.type'
import { ParamValue } from 'next/dist/server/request/params'
import { useEffect, useState } from 'react'

interface Props {
	city: ParamValue
}

export function DetailInfo({ city }: Props) {
	const [tempData, setTempData] = useState<IWeatherResponse | null>(null)
	const [isLoading, setLoading] = useState(false)
	const cityData = CITIES.find((c) => c.name === city)
	const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

	const fetchWeather = (city: ICity | undefined) => {
		setLoading(true)

		if (city) {
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
	}

	useEffect(() => {
		fetchWeather(cityData)
	}, [])

	return (
		<>
			<Header isHome={false} city={city} />
			{isLoading ? (
				<p className={styles.loading_text}>Page is loading...</p>
			) : (
				<>
					<div className={styles.container}>
						<p>Temp: {tempData?.current.temp}°C</p>
						<p>Feels like: {tempData?.current.feels_like}°C</p>
						<p>Humidity: {tempData?.current.humidity}%</p>
						<p>Clouds: {tempData?.current.clouds}%</p>
						<p>Visibility: {tempData?.current.visibility}m</p>
						<p>Wind speed: {tempData?.current.wind_speed}m/s</p>
					</div>
				</>
			)}
		</>
	)
}
