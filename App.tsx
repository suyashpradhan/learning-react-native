/** @format */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Button,
	FlatList,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const data = await fetch('https://reactnative.dev/movies.json');
			const json = await data.json();
			setData(json.movies);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />
			<Text style={styles.title}>Networking</Text>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<Text style={styles.subtitle}>
							{item.title}, {item.releaseYear}
						</Text>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 45,
		paddingLeft: 18,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		paddingVertical: 12,
	},
	subtitle: {
		fontSize: 20,
	},
});
