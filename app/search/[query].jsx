import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View, ActivityIndicator } from "react-native";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { useEffect, useState } from "react";
import useAppWrite from "../../lib/useAppwrit";
import VideoCard from "../../components/VideoCard";
import { SerachByTitle } from "../../lib/appwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { Dtata, loding, refechData } = useAppWrite(() => SerachByTitle(query));
  useEffect(() => {
    refechData();
  }, [query]);
  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary h-full">
      {!Date ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <FlatList
          data={Dtata}
          keyExtractor={(item) => item?.$id}
          renderItem={({ item }) => (
            <VideoCard
              title={item?.title}
              creator={item?.UseName}
              avatar={item.Avtar}
              thumbnail={item?.thamnil}
              video={item?.video}
            />
          )}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6 w-full">
              <View className="flex justify-between items-start flex-row mb-6">
                <View className="flex-1">
                  <Text className="text-2xl font-psemibold text-white my-2">
                    Search Result {query}
                  </Text>
                  <SearchInput
                    initialValue={query}
                    placeholder="Search"
                    otherStyles={"m-0"}
                  />
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for your search"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
