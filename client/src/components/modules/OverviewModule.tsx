import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommentSection from '../ui/comment-section';
import { fetchComments } from '@/store/slices/commentSlice';

const OverviewModule = () => {
      const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const {comments} = useSelector((state: RootState) => state.comments);

  return (
    <Card className="module-card">
        <CardHeader>
          <div className="flex w-24 items-center justify-between">
            <CardTitle>Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <h2>Recent Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <p>
                            <strong>{comment.firstName} {comment.lastName}</strong> ({comment.email}):
                        </p>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
            <CommentSection/>
        </CardContent>
    </Card>
  )
}

export default OverviewModule