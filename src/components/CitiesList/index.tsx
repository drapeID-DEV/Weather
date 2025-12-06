import styles from './CititesList.module.scss'

import { ICity } from '@/shared/types/city.type'
import { WeatherCard } from '../WeatherCard'

interface Props {
	cities: ICity[]
}

export function CitiesList({ cities }: Props) {
	return (
		<div className={styles.list}>
			{cities.map((city) => (
				<WeatherCard key={city.name} city={city} />
			))}
		</div>
	)
}
