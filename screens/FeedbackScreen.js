import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getFeedbackByCategory } from '../api/feedbackApi';

const FeedbackScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: `Đánh giá ${categoryName}`,
    });
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await getFeedbackByCategory(categoryId);
      setFeedbacks(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <AntDesign
            key={index}
            name={index < rating ? "star" : "staro"}
            size={16}
            color={index < rating ? "#FFD700" : "#000"}
          />
        ))}
      </View>
    );
  };

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.ratingContainer}>
        {renderStars(item.rating)}
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString('vi-VN')}
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ba2d32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchFeedbacks}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const hasReviews = feedbacks.length > 0;
  const averageRating = hasReviews 
    ? feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length
    : 0;

  return (
    <View style={styles.container}>
      {hasReviews && (
        <View style={styles.header}>
          <View style={styles.ratingOverview}>
            <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
            {renderStars(Math.round(averageRating))}
            <Text style={styles.totalReviews}>
              {feedbacks.length} đánh giá
            </Text>
          </View>
        </View>
      )}
      
      {!hasReviews && (
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>
            Chưa có đánh giá nào
          </Text>
        </View>
      )}

      <FlatList
        data={feedbacks}
        renderItem={renderFeedbackItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 16,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  feedbackItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: '#ba2d32',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#ba2d32',
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noReviewsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
  },
});

export default FeedbackScreen;