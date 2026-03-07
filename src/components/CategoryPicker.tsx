import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
// @ts-expect-error - Expo vector icons types
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DEFAULT_CATEGORIES, Category } from '../data/categories';

interface CategoryPickerProps {
  selectedCategoryId?: string | null;
  onSelect: (categoryId: string) => void;
  language?: 'it' | 'en';
}

export function CategoryPicker({
  selectedCategoryId,
  onSelect,
  language = 'en',
}: CategoryPickerProps) {
  const theme = useTheme();

  const renderCategory = ({ item }: { item: Category }) => {
    const isSelected = item.id === selectedCategoryId;
    
    return (
      <TouchableOpacity
        onPress={() => onSelect(item.id)}
        activeOpacity={0.7}
      >
        <Surface
          style={[
            styles.categoryItem,
            {
              backgroundColor: isSelected
                ? `${item.color}20`
                : theme.colors.surface,
              borderColor: isSelected ? item.color : theme.colors.outline,
              borderWidth: isSelected ? 2 : 1,
            },
          ]}
          elevation={isSelected ? 2 : 1}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${item.color}20` },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={item.color}
            />
          </View>
          
          <Text
            numberOfLines={2}
            style={[
              styles.categoryName,
              { color: theme.colors.onSurface },
              isSelected && { fontWeight: '600' },
            ]}
          >
            {language === 'it' ? item.nameIt : item.nameEn}
          </Text>
          
          {isSelected && (
            <View style={styles.checkmark}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={item.color}
              />
            </View>
          )}
        </Surface>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DEFAULT_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  listContent: {
    paddingBottom: 8,
  },
  categoryItem: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    position: 'relative',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
