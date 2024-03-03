import { Card, Image, Text, Button, Group, Center, Avatar } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from './MarketplaceCard.module.css';
import { ItemForSale } from '@/src/API';

interface MarketplaceCardProps {
  item: ItemForSale;
  onView: () => void;
}

export function MarketplaceCard({ item, onView }: MarketplaceCardProps) {
  return (
    <Card withBorder radius="md" className={classes.card} data-testid="marketplace-card">
      <a>
        <Image
          src={item?.images?.[0] ?? './img/placeholder-img.jpg'}
          height={180}
          className={classes.image}
        />
      </a>

      <Text className={classes.title} fw={700} c="dark.6" fz="lg" component="a" truncate="end">
        {item?.title}
      </Text>

      <Text className={classes.price} fw={500} fz="md" mt={0} component="a">
        ${item?.price}
      </Text>

      <Group>
        <Center>
          <Avatar src={item?.seller?.profilePic} size={23} radius="xl" mr={7} />
          <Text fz="sm" c="dimmed" truncate="end">
            {item?.seller?.firstName} {item?.seller?.lastName}
          </Text>
        </Center>
      </Group>

      <Text className={classes.details} c="dark.6" fz="sm" truncate="end">
        {item?.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Group gap={8} mr={0}>
          <Button
            radius="md"
            size="compact-sm"
            leftSection={<FontAwesomeIcon icon={faBars} />}
            variant="filled"
            onClick={onView}
          >
            View
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
