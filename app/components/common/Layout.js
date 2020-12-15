import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';

export const Container = ({ children, style }) => 
  <SafeAreaView style={[styles.container, style]}>
    {children}
  </SafeAreaView>

export const Content = ({ children, style }) => 
  <View style={[styles.content, style]}>
    {children}
  </View>

export const ScrollingContent = ({ children, style }) => 
  <ScrollView style={[styles.content, style]}>
    {children}
  </ScrollView>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  }
})