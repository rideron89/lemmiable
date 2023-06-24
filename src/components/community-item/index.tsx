import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { AppCommunity } from "../../models";
import { pluralize } from "../../utility/index";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
}))

export const CommunityItem: React.FC<{ community: AppCommunity }> = ({ community }) => {
  const { posts, subscribers, users_active_week: usersActivePerWeek } = community.counts

  const activeUsersPerWeekText = `${usersActivePerWeek?.toLocaleString() ?? 0} Active ${pluralize(usersActivePerWeek, "User", "Users")} per Week`
  const postsText = `${posts?.toLocaleString() ?? 0} total ${pluralize(posts, "post", "posts")}`
  const subscribersText = `${subscribers?.toLocaleString() ?? 0} total ${pluralize(subscribers, "subscriber", "subscribers")}`

  return (
    <Wrapper>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>/c/{community.name}</Typography>
          <Typography variant="h5" component="div" gutterBottom>{community.title}</Typography>
          <Typography component="div" gutterBottom>{community.description}</Typography>

          <Box sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
          }}>
            <Chip label={activeUsersPerWeekText} />
            <Chip label={postsText} sx={{ ml: 1.0 }} />
            <Chip label={subscribersText} sx={{ ml: 1.0 }} />
          </Box>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
