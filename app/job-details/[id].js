import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualification", "Responsibilites"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTabs, setActiveTabs] = useState(tabs[0])




  const displayTabContent = () => {
    switch (activeTabs) {
      case tabs[0]:
        return <JobAbout  info = { data[0].job_description ?? 'No Data Provided'  } />

      case tabs[1]:
        return <Specifics  title = "Qualifications" points = {data[0].job_highlights?.Qualifications ?? ["N/A"]   } />
    
        case tabs[2]:
          return <Specifics  title = "Responsibilities" points = {data[0].job_highlights?.Responsibilities ?? ["N/A"]   } />
      
      default:
        break;
    }
  }

  const { data, isLoading, error, refetch } = useFetch(
    "job-details",
    {
      job_id: params.id,
    },
    false
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),

          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs tabs={tabs} activeTab={activeTabs} setActiveTab = {setActiveTabs} />

{displayTabContent()}

            </View>
          )}
        </ScrollView>


        <JobFooter   url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
