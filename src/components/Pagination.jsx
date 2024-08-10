import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ totalPosts, postsPerPage, onPress, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.length > 1 && (
        <View style={styles.pagination}>
          {pages.map(page => (
            <TouchableOpacity
              key={page}
              style={[
                styles.paginationButton,
                parseInt(currentPage) === page && styles.activeButton,
              ]}
              onPress={() => onPress(page)}
            >
              <Text
                style={[
                  styles.paginationText,
                  parseInt(currentPage) === page && styles.activeText,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#E96E6E',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#C96E6E',
  },
  paginationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeText: {
    color: 'black',
  },
});

export default Pagination;
