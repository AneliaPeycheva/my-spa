import { useForm, useContext } from "../../../Hooks/useForm";


export const AddComment = ({onCommentSubmit}) => {
    const [values, handleChange, onSubmit] = useForm({
        comment:""
    }, onCommentSubmit)
    return (
        <article className="add-comment-container">
            <h2>Add comment:</h2>
            <form className="comment-form" onSubmit={onSubmit}>
                <textarea name="comment" cols="63" rows="5" wrap="on" placeholder="Your comment here......" value={values.comment} onChange={handleChange}></textarea>
                <div>
                    <input className="recipe-btn" type="submit" value="Add Comment" />
                </div>                
            </form>
        </article>
    )
}