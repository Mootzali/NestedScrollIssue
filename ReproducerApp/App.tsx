import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

const ItemBox = ({ title }) => (
  <View style={styles.itemBox}>
    <Text>{title}</Text>
  </View>
)

export default function NestedScrollTest() {
  const tabs = [
    { key: 'one', title: 'Tab One' },
    { key: 'two', title: 'Tab Two' },
    { key: 'three', title: 'Tab Three' },
    { key: 'four', title: 'Tab Four' },
    { key: 'five', title: 'Tab Five' },
  ]

  // Generate lots of items so it scrolls
  const allItems = Array.from({ length: 50 }, (_, i) => `Item #${i + 1}`)

  const [activeTab, setActiveTab] = useState(tabs[0].key)

  const filteredItems = allItems.filter(
    (_, idx) => idx % tabs.length === tabs.findIndex(t => t.key === activeTab)
  )

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => alert(`Submitting on "${activeTab}"`)}
      >
        <Text style={styles.submitText}>Top Submit Button</Text>
      </TouchableOpacity>
      {/* Vertical scroll area with sticky header */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        nestedScrollEnabled
        removeClippedSubviews={false}
        stickyHeaderIndices={[0]}
      >
        {/* Sticky horizontal tab bar */}
        <View style={styles.stickyContainer} pointerEvents="box-none">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            pointerEvents="auto"
            contentContainerStyle={styles.tabBar}
            onStartShouldSetResponder={() => true}
          >
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
                style={[
                  styles.tabButton,
                  activeTab === tab.key && styles.activeTab,
                ]}
              >
                <Text style={
                  activeTab === tab.key ? styles.activeTabText : styles.tabText
                }>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {filteredItems.map(title => (
          <ItemBox key={title} title={title} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => alert(`Submitting on "${activeTab}"`)}
      >
        <Text style={styles.submitText}>Bottom Submit Button</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  stickyContainer: {
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 4,
  },
  tabBar: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: '#EEE',
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    fontSize: 14,
    color: '#FFF',
  },
  itemBox: {
    height: 80,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitButton: {
    padding: 16,
    backgroundColor: '#28A745',
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
  },
})
