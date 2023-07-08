import { useRouter } from 'next/router'
import { TableOfContents } from './tableOfContents'
import { Grid, Container } from '@mantine/core'

const links = [
    {
        label: 'Summary', id: 'summary', order: 0
    },
    {
        label: 'Key points', id: 'keypoints', order: 0
    },
    {
        label: 'Notes', id: 'notes', order: 0
    },
]

  
export default function Page() {
  const router = useRouter()
  return (
    <Container>
        <h2>[Title]</h2>
        <Grid>
            <Grid.Col xs = {0} sm={3}>
                <TableOfContents id="100" links={links}/>
            </Grid.Col> 
            <Grid.Col xs = {12} sm={9}>
                <h4 id='summary'>Summary</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tenetur vel consequatur eos odit, laborum fuga. Quisquam quo, deleniti nostrum sit beatae modi itaque, asperiores, dignissimos tenetur deserunt perferendis ut!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tenetur vel consequatur eos odit, laborum fuga. Quisquam quo, deleniti nostrum sit beatae modi itaque, asperiores, dignissimos tenetur deserunt perferendis ut!</p>
                <h4 id='keypoints'>Key Points</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit ametß consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <h4 id='notes'>Notes</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit ametß consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.</p>
            </Grid.Col> 
        </Grid>
    </Container>
  )
}